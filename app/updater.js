var Git = require("nodegit");
var pathToRepo = require("path").resolve("data");

module.exports.updateRepo = function(callback, callback2) {
  Git.Repository.open(pathToRepo).then(function (repo) {
    // console.log("Repo opened")
    repository = repo;
      return repository.fetchAll({
        callbacks: {
          credentials: function(url, userName) {
            return Git.Cred.sshKeyFromAgent(userName);
          },
          certificateCheck: function() {
            return 1;
          }
        }
      }).catch(function(err) { console.log(err); });
    })
    // Now that we're finished fetching, go ahead and merge our local branch
    // with the new one
    .then(function() {
      var localSha;
      var originSha;
      repository.getBranchCommit("prod").then(function(commit) {
        // console.log("Prod:")
        // console.log(commit.sha());
        localSha = commit.sha();
        repository.getBranchCommit("origin/prod").then(function(commit) {
          // console.log("Origin Prod:")
          // console.log(commit.sha());
          originSha  = commit.sha();
          if (localSha != originSha) {
            repository.mergeBranches("prod", "origin/prod");
            callback();
            setTimeout(callback, 3000)
            console.log("App was updated.");
          } else {
            // console.log("There is no update available.");
            callback2();
          }
        }).catch(function(err) { console.log(err); });
      }).catch(function(err) { console.log(err); });
    });
}