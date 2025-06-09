import { createContext } from "react";
import type { NotificationContextType } from "../interfaces/Notification";

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
