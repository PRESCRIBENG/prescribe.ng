"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Define types for HMO partners
interface HMOPlan {
	plan: string;
	price: string;
	description: string;
	coverageLimit: string;
}

interface HMOPartner {
	organisation: string;
	email: string;
	logoUrl: string;
	telephone: string;
	motto: string;
	plans: HMOPlan[];
}

const HMOPartners = () => {
	const [currentPage, setCurrentPage] = useState<"hmoList" | "hmoDetails">(
		"hmoList"
	);
	const [partners, setPartners] = useState<HMOPartner[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedHMO, setSelectedHMO] = useState<HMOPartner | null>(null);
	// const [showDetails, setShowDetails] = useState<boolean>(false);

	useEffect(() => {
		const fetchHMOPartners = async () => {
			try {
				setLoading(true);
				const res = await fetch("/api/web/hmo_partners", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!res.ok) {
					throw new Error(`Error fetching HMO partners: ${res.statusText}`);
				}

				const data = await res.json();

				// Extract the hmoPartners array from the response
				const partnersArray =
					data && data.hmoPartners && Array.isArray(data.hmoPartners)
						? data.hmoPartners
						: [];

				setPartners(partnersArray);
				setError(null);
			} catch (err) {
				console.error("Failed to fetch HMO partners:", err);
				setError("Failed to load HMO partners");
				setPartners([]);
			} finally {
				setLoading(false);
			}
		};

		fetchHMOPartners();
	}, []);

	// Handle selecting an HMO
	const handleSelectHMO = (partner: HMOPartner) => {
		setSelectedHMO(partner);
		setCurrentPage("hmoDetails"); // Switch to detail view
		setTimeout(() => {
			const detailsSection = document.getElementById("hmo-details-section");
			if (detailsSection) {
				detailsSection.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	};

	// Handle going back to the list
	const handleBackToList = () => {
		setSelectedHMO(null);
		setCurrentPage("hmoList"); // Go back to list
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Default features for HMO plans for now
	const defaultFeatures = [
		"24/7 Customer Support",
		"Nationwide Coverage",
		"Quick Claim Processing",
		"Digital Access to Healthcare Services",
	];

	return (
		<div className="relative mt-24">
			{/* HMO Partners List Section */}
			{currentPage === "hmoList" && (
				<div className={"px-6 xl:px-[130px] py-12 space-y-16"}>
					<div className="items-center space-y-3">
						<h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
							Trusted HMO Partners
						</h1>
						<p className="text-[16px]">
							We collaborate with top Health Maintenance Organizations (HMOs) to
							ensure quality healthcare access for all our users.
						</p>
					</div>

					<div className="overflow-hidden bg-[#F5F5F5] text-[16px]">
						{loading ? (
							<div className="flex justify-center items-center h-64">
								<p className="text-xl">Loading...</p>
							</div>
						) : error ? (
							<div className="flex justify-center items-center h-64">
								<p className="text-xl text-red-500">{error}</p>
							</div>
						) : partners.length === 0 ? (
							<div className="flex justify-center items-center h-64">
								<p className="text-xl">
									No HMO partners available at the moment.
								</p>
							</div>
						) : (
							<div className="">
								<div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide w-full">
									{partners.map((partner, i) => (
										<div
											key={i}
											onClick={() => handleSelectHMO(partner)}
											className="snap-start flex-shrink-0 w-[342px] md:w-auto bg-white rounded-[5px] cursor-pointer hover:shadow-md transition duration-300"
										>
											<div>
												<p className="flex justify-end mt-2 mx-4">
													<span className="">Sponsored</span>
												</p>
												{/* <Image
                        className="w-[230px] h-[180px] object-cover justify-center items-center rounded-t-[5px] mx-auto"
                        src={partner.logoUrl}
                        alt={`Image of ${partner.organisation}`}
                        width={342}
                        height={178}
                      /> */}
												<div className="p-4 space-y-2">
													<p className="font-montserrat text-[20px] font-bold">
														{partner.organisation}
													</p>
													<p className="italic text-gray-600">
														"{partner.motto}"
													</p>
													<p className="flex items-center gap-1">
														<span className="font-bold">Rating: </span>
														<Image
															className="w-[85px] flex h-[17px]"
															src="/ratings.svg"
															alt="ratings"
															width={85}
															height={17}
														/>
													</p>
													<p>
														<span className="font-bold">Email: </span>
														<span className="text-[#0077B6]">
															{partner.email}
														</span>
													</p>
													<p>
														<span className="font-bold">Phone: </span>
														{partner.telephone}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* HMO Details Section */}
			{currentPage === "hmoDetails" && selectedHMO && (
				<div id="hmo-details-section" className="min-h-screen bg-gray-50 py-12">
					<div className="container mx-auto px-4">
						<div className="overflow-hidden">
							<div className="md:hidden mb-4">
								<button
									onClick={handleBackToList}
									className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]"
								>
									Back to HMO Partners
								</button>
							</div>

							<div className="p-6 md:p-8">
								<div className="space-y-8">
									<div className="">
										<div className="flex gap-4">
											<button onClick={handleBackToList} className="p-2">
												<Image
													src="/arrow-left.svg"
													alt="Left"
													width={24}
													height={24}
												/>
											</button>
											<h1 className="text-[40px] font-bold">
												{selectedHMO.organisation}
											</h1>
										</div>

										{/* <Image
                      src={selectedHMO.logoUrl}
                      alt={selectedHMO.organisation}
                      width={274}
                      height={195}
                      className="object-contain"
                    /> */}
									</div>

									<div className="p-4 space-y-2">
										<p className="font-montserrat text-[16px] font-bold">
											{selectedHMO.organisation}
										</p>
										<p className="italic text-gray-600">
											"{selectedHMO.motto}"
										</p>
										<p className="text-[16px]">
											<span className="font-bold">Rating: </span>
											<Image
												className="inline w-[85px] h-[17px]"
												src="/ratings.svg"
												alt="ratings"
												width={85}
												height={17}
											/>
										</p>
										<p>
											<span className="font-bold">Email: </span>
											<span className="text-[#0077B6]">
												{selectedHMO.email}
											</span>
										</p>
										<p>
											<span className="font-bold">Phone: </span>
											{selectedHMO.telephone}
										</p>
										<p>
											<span className="font-bold">Website: </span>
											<a
												href={`https://www.${selectedHMO.organisation
													.toLowerCase()
													.replace(/\s+/g, "")}.com`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#0077B6]"
											>
												{`www.${selectedHMO.organisation
													.toLowerCase()
													.replace(/\s+/g, "")}.com`}
											</a>
										</p>
									</div>

									<div className="text-center space-y-16">
										<div>
											<h2 className="text-[32px] font-semibold text-[#002A40] mb-3">
												About {selectedHMO.organisation}
											</h2>
											<p className="text-[#002A40]">
												{selectedHMO.organisation} is a trusted Health
												Maintenance Organization committed to providing quality
												healthcare services. With our {selectedHMO.motto}, we
												strive to ensure that all our members receive the best
												medical care available.
											</p>
										</div>

										<div>
											<h2 className="text-[32px] font-semibold text-[#002A40] mb-3">
												Our Health Plans
											</h2>
											<p className="text-[#002A40]">
												We offer a range of flexible health insurance plans
												designed to meet your specific needs. From basic
												coverage to comprehensive plans, we have options for
												individuals, families, and corporate entities.
											</p>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{selectedHMO.plans.map((plan, index) => (
												<div
													key={index}
													className="text-left space-y-4 bg-[#ffffff] px-4 py-6 rounded-[10px]"
												>
													<h3 className="text-[24px] font-semibold text-[#002A40]">
														{plan.plan}
													</h3>
													<p className="text-[#002A40]">{plan.description}</p>
													<p className="text-[#002A40] font-semibold">
														Price: ₦{plan.price}
													</p>
													<p className="text-[#002A40]">
														Coverage Limit: {plan.coverageLimit}
													</p>

													<div className="text-left px-4">
														{defaultFeatures.map((feature, idx) => (
															<p key={idx} className="text-[#002A40] mb-2">
																• {feature}
															</p>
														))}
													</div>
												</div>
											))}
										</div>

										<div>
											<h2 className="text-[32px] font-semibold text-[#002A40] mb-3">
												Partner Hospitals and Clinics
											</h2>
											<p className="text-[#002A40]">
												Our extensive network includes top-rated hospitals and
												clinics across the country. Please contact us or visit
												our website for a complete list of partner facilities.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Call to Action Section */}
			<div className="bg-[#FFF1E8] px-6 xl:px-[130px] py-12 space-y-4">
				<div className="flex flex-col items-center space-y-3">
					<h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
						How to Become an HMO Partner
					</h1>
					<p className="text-[16px]">
						Are you an HMO looking to partner with us? Join our network and give
						your members even more access to trusted healthcare services{" "}
					</p>
				</div>
				<div className="flex justify-center">
					<button className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]">
						Contact Us
					</button>
				</div>
			</div>
		</div>
	);
};

export default HMOPartners;
