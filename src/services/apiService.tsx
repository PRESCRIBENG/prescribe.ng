
// Use relative URL for proxied requests
const API_BASE_URL = '/api';

interface LoginResponse {
  token: string;
  message?: string;
}

interface TotpVerificationResponse {
  token: string;
  message?: string;
}

interface ClinicianData {
  userData: {
    accountStatus: string;
    clinician: string;
    email: string;
    folioNumber: string;
    grade: string;
    licenseExpiry: string;
    mobile: string;
    photoUrl: string;
    registrationVerification: string;
    specialty: string;
    userDomain: string;
    userID: string;
    vettingStatus: string;
  };
}

export class AuthError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

/**
 * Login a clinician with email and password
 * 
 * @param email - Clinician's email
 * @param password - Clinician's password
 * @returns An incomplete token to be used for TOTP verification
 */
export const loginClinician = async (email: string, password: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clinician/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new AuthError(data.message || 'Login failed', response.status);
    }

    return data.token;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error(`Login error: ${(error as Error).message}`);
  }
};

/**
 * Verify TOTP for a clinician
 * 
 * @param incompleteToken - The incomplete token from login
 * @param totp - The TOTP code entered by clinician
 * @returns A complete authentication token
 */
export const verifyTOTP = async (incompleteToken: string, totp: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clinician/verify_totp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: incompleteToken, totp }),
    });

    const data: TotpVerificationResponse = await response.json();

    if (!response.ok) {
      throw new AuthError(data.message || 'TOTP verification failed', response.status);
    }

    return data.token;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error(`TOTP verification error: ${(error as Error).message}`);
  }
};

/**
 * Get clinician data from the clinicianpanel endpoint
 * 
 * @param token - The authenticated token
 * @returns Clinician data
 */
export const getClinicianData = async (token: string): Promise<ClinicianData['userData']> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clinicianpanel`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data: ClinicianData = await response.json();

    if (!response.ok) {
      throw new AuthError('Failed to fetch clinician data', response.status);
    }

    return data.userData;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error(`Error fetching clinician data: ${(error as Error).message}`);
  }
};

/**
 * Check if the user is authenticated
 * 
 * @returns Boolean indicating authentication status
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get token from localStorage
 * 
 * @returns The authentication token or null if not present
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Store token in localStorage
 * 
 * @param token - The authentication token to store
 */
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

/**
 * Remove token from localStorage (logout)
 */
export const removeToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  localStorage.removeItem('incompleteToken');
};

/**
 * Handle authentication flow - login and TOTP verification
 * 
 * @param email - Clinician's email
 * @param password - Clinician's password
 * @param totp - TOTP verification code
 * @returns Clinician data after successful authentication
 */
export const authenticateClinician = async (
  email: string, 
  password: string, 
  totp: string
): Promise<ClinicianData['userData']> => {
  // First step: Login with email and password
  const incompleteToken = await loginClinician(email, password);
  
  // Second step: Verify TOTP
  const token = await verifyTOTP(incompleteToken, totp);
  
  // Store token
  setToken(token);
  
  // Get clinician data
  const userData = await getClinicianData(token);
  
  // Store user data
  localStorage.setItem('userData', JSON.stringify(userData));
  
  return userData;
};