// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect!");
    }

    const db = client.db(databaseName);

    // 1) Inserting data into database {Create Operation}
    /*
    db.collection("users").insertOne(
      {
        _id: id,
        name: "Tom",
        age: 30,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }

        console.log(result.insertedId);
      }
    );
    */

    // Insert more than one document using insertMany()
    /*
    db.collection("users").insertMany(
      [
        {
          name: "Jenny",
          age: 19,
        },
        {
          name: "Gunther",
          age: 25,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }

        console.log(result.insertedIds);
      }
    );
    */

    // #Insert documents in collection named tasks
    /*
    db.collection("tasks").insertMany(
      [
        {
          desc: "Self Reporting",
          completed: false,
        },
        {
          desc: "Office work",
          completed: true,
        },
        {
          desc: "Skill Dev",
          completed: true,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert task!");
        }

        console.log(result.insertedCount);
        console.log(result.insertedIds);
      }
    );
    */

    // 2) Fetching data from database {Read Operation}
    /*
    db.collection("users").findOne({ name: "Jenny" }, (error, user) => {
      if (error) {
        return console.log("Unable to fetch");
      }

      console.log(user);
    });
    */

    // Fetching using ObjectID
    /*
    db.collection("users").findOne(
      { _id: new ObjectID("6190fb1f1cdc0a34880f54d1") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    );
    */

    // Find multiple documents using find()
    /*
    db.collection("users")
      .find({ age: 21 })
      .toArray((error, users) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(users);
      });

    db.collection("users")
      .find({ age: 21 })
      .count((error, count) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(count);
      });
      */

    // #Challenge to fetch tasks
    /*
    db.collection("tasks").findOne(
      { _id: new ObjectID("618ee2e97325ac4a29c84a1c") },
      (error, task) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(task);
      }
    );
    */

    // To fetch all not completed tasks
    /*
    db.collection("tasks")
      .find({ completed: true })
      .toArray((error, tasks) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(tasks);
      });
    */

    // 3) Update docs following Promises Pattern { Update Operation}
    /*
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("618ede45daafd364330f4d3c"),
        },
        {
          $set: {
            name: "Mike",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
      */

    // #Challenge to use Update Many following Promises
    /*
    db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    */

    // 4) Delete Many following Promises {Delete Operation}
    /*
    db.collection("users")
      .deleteMany({
        age: 21,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    */

    // #Challenge Delete one task using Promises
    db.collection("tasks")
      .deleteOne({
        desc: "Skill Dev",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
