interface UserSession {
  username: string;
}

const sessions: Map<string, UserSession> = new Map();

export const addSession = (username: string) => {
  sessions.set(username, { username });
};

export const removeSession = (username: string) => {
  sessions.delete(username);
};

export const getSession = (username: string) => {
  return sessions.get(username);
};

export const isLoggedIn = (username: string): boolean => {
  return sessions.has(username);
};
