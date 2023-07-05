import cluster from "cluster";

export default function ClusterService(clusterN) {
  cluster.on("listening", (worker) =>
    console.log(
      `Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`
    )
  );

  // Catch cluster once it is back online event...
  cluster.on("online", (worker) =>
    console.log(
      `Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `
    )
  );

  // Catch cluster disconnect event...
  cluster.on("disconnect", (worker) =>
    console.log(
      `Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`
    )
  );

  // Catch cluster exit event...
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`
    );
    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });

  // Catch the Process's uncaught-exception
  process.on("uncaughtException", (exception) =>
    console.error(exception.stack)
  );

  // Catch the Process's warning event
  process.on("warning", (warning) => console.warn(warning.stack));
}
