import { AppDispatch } from "@/state/store/configure-store";
import { useDispatch } from "react-redux";

const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppDispatch };
