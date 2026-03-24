import { useContext } from "react";
import { AuthContext, AuthContextData } from "../context/AuthContext";

export function useAuth(): AuthContextData
{
	return useContext(AuthContext);
}