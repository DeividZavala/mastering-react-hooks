import React, { useState, useEffect } from "react";
import Battery from "./Battery";

const BatteryContainer = () => {
	const [battery, setBaterry] = useState({ level: 0, charging: false });

	const handleChange = ({level, charging}) => {
		setBaterry({level, charging});
	};

	useEffect(() => {
		let battery;
		navigator.getBattery().then(bat => {
			battery = bat;
			console.log(bat)
			battery.addEventListener("levelchange", handleChange);
			battery.addEventListener("chargingchange", handleChange);
			handleChange(battery );
		});
		return () => {
			battery.removeEventListener("levelchange", handleChange);
			battery.removeEventListener("chargingchange", handleChange);
		}
	}, []);

		return (
			<section>
				<Battery {...battery} />
			</section>
		);

};

export default BatteryContainer;
