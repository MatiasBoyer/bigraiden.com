type IHealth = {
  server: {
    uptime: number;
    timestamp: number;
  };
  database: {
    uptime: number;
    questions: number;
    threads_connected: number;
    threads_running: number;
  };
};

export { IHealth };
