//Erstellung einer Datenbank
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "deinbenutzername",
  password: "deinpasswort"
});

con.connect(function(err) {
  console.log("Verbunden!");
  con.query("CREATE DATABASE highscoreDB", function (err, result) {
    console.log("Datenbank erstellt");
  });
});

//Erstellung einer Tabelle
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "deinbenutzername",
  password: "deinpasswort",
  database: "highscoreDB"
});

con.connect(function(err) {
  console.log("Verbunden!");
  var sql = "CREATE TABLE highscores (name VARCHAR(50), highscore INT NOT NULL)";
  con.query(sql, function (err, result) {
    console.log("Tabelle erstellt");
  });
});

//Hinzufügen eines Highscores
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "deinbenutzername",
  password: "deinpasswort",
  database: "highscoreDB"
});

con.connect(function(err) {
  console.log("Verbunden!");
  var sql = "INSERT INTO highscores (name, highscore) VALUES ('Testuser', 'NeuerHighscore')";
  con.query(sql, function (err, result) {
    console.log("1 Datensatz wurde hinzugefügt");
  });
});
// Test - Dankbanküberprüfung
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "deinbenutzername",
  password: "deinpasswort",
  database: "highscoreDB"
});

con.connect(function(err) {
  con.query("SELECT * FROM highscores", function (err, result, fields) {
    console.log(result); //noch undefined Ergebnis
  });
});