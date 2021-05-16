import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('medications2.db');


export const init = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS meds2 (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, form TEXT, strength TEXT, strengthValue TEXT, quantity TEXT, quantityValue TEXT, alarm1 TEXT, alarm2 TEXT, alarm3 TEXT, reason TEXT, instructions TEXT);',
            [],
          () => {
            resolve();
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };

 


  export const insertMed = (title, form, strength, strengthValue, quantity, quantityValue, alarm1, alarm2, alarm3, reason, instructions) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(   
            `INSERT INTO meds2 (title, form, strength, strengthValue, quantity, quantityValue, alarm1, alarm2, alarm3, reason, instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, // stops sql injection
            [title, form, strength, strengthValue, quantity, quantityValue, alarm1,alarm2, alarm3, reason, instructions],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};


export const fetchMeds = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM meds2',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};


export const delMed = (id) => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM meds2 WHERE id=?',
          [id],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};



export const addAlarm1 = (newTime,medId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE meds2 SET alarm1=? where id=?',
          [newTime,medId],
        () => {
          resolve();
          console.log("alarm added",newTime);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addAlarm2 = (newTime,medId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE meds2 SET alarm2=? where id=?',
          [newTime,medId],
        () => {
          resolve();
          console.log("alarm added",newTime);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const addAlarm3 = (newTime,medId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE meds2 SET alarm3=? where id=?',
          [newTime,medId],
        () => {
          resolve();
          console.log("alarm added",newTime);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};




