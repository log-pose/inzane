import { mysqlClient } from "conf/db";
import logger from "conf/logger";

const executeQuery = (query: string) => {
  return new Promise((resolve, reject) => {
    mysqlClient.query(query, (err: any, results: any) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(results);
    });
  });
};

const executeQueryWithParams = (query: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    mysqlClient.query(query, params, (err: any, results: any) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(results);
    });
  });
};

interface Query {
  query: string;
  params: any[];
}

const executeTransaction = (queries: Query[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    mysqlClient.beginTransaction((err) => {
      if (err) {
        logger.error(err);
        return reject(err);
      }

      const executeQuery = (index: number): void => {
        if (index >= queries.length) {
          mysqlClient.commit((err) => {
            if (err) {
              logger.error(err);
              return mysqlClient.rollback(() => reject(err));
            }
            return resolve(true);
          });
        } else {
          const query = queries[index];
          mysqlClient.query(query.query, query.params, (err, results) => {
            if (err) {
              logger.error(err);
              return mysqlClient.rollback(() => reject(err));
            }
            executeQuery(index + 1);
          });
        }
      };

      executeQuery(0);
    });
  });
};

export { executeQuery, executeQueryWithParams, executeTransaction };
