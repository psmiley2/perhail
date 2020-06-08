import axios from "axios";
import { useEffect, useState } from "react";
export default function TestAuth() {
    const [state, setstate] = useState("loading");

    useEffect(() => {
        (async () => {
            let response;
            await axios
                .get("http://localhost:8080/users/dashboard", {
                    withCredentials: true,
                })
                .then((res) => {
                    response = res;
                })
                .catch((err) => console.log(err));
            console.log(response);
            setstate(response.data);
        })();
    }, []);

    return state;
}
