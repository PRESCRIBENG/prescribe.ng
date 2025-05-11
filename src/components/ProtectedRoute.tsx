// "use client";

// import { useEffect, useState, ReactNode } from "react";
// import { useRouter } from "next/navigation";
// import { isAuthenticated } from "../services/apiService";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is authenticated
//     if (!isAuthenticated()) {
//       router.push("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0077B6]"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;