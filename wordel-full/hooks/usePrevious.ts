import { user } from "@/types/types";
import { useEffect, useRef } from "react";

function usePrevious(value: user | null) {
	const ref = useRef({} as user | null);

	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
}
export default usePrevious;
