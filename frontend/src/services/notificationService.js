import mockNotifications from "../mocks/notifications";

export const getNotifications = async () => mockNotifications;

export const getUnreadCount = (notifications) =>
  notifications.filter((n) => !n.read).length;
