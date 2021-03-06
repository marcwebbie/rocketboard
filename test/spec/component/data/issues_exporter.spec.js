describeComponent('component/data/issues_exporter', function () {
  beforeEach(function () {
    this.setupComponent();
  });

  it('creates a link to download csv', function() {
    var issues = [
      {
        "projectName": "pixelated-platform",
        "number":   "90",
        "title":    "sending mails",
        "state":   "open",
        "labels": [{name: "1- Backlog"}, {name: "2- Dev"}],
        "kanbanState":   "1 - Ready",
        "body":     "should send email"
      },
      {
        "projectName": "pixelated-user-agent",
        "number":   "92",
        "title":    "handle errors on sending mails",
        "state":   "open",
        "labels": [{name: "3- QA"}, {name: "2- Dev"}],
        "kanbanState":   "0 - Backlog",
        "body":     "If mails can't be sent by the twisted process"
      }
    ];

    expect(this.component.linkToCsv({'issues': issues})).toEqual("data:text/csv;charset=utf8," + encodeURIComponent(
        "Source;Github ID;Title;Status;Kanban State;Description;Tags;Create at;Closed at;Lead Time" +
        "\npixelated-platform;90;\"sending mails\";open;1 - Ready;\"should send email\";\"1- Backlog,2- Dev\";;;" +
        "\npixelated-user-agent;92;\"handle errors on sending mails\";open;0 - Backlog;\"If mails can't be sent by the twisted process\";\"3- QA,2- Dev\";;;\n"));
  });

  it('creates a csv link and adds new issues to the end of it', function(){
    var issues = [
      {
        "projectName": "pixelated-platform",
        "number":   "90",
        "title":    "sending mails",
        "state":   "open",
        "labels": [],
        "kanbanState":   "1 - Ready",
        "body":     "should send email"
      },
      {
        "projectName": "pixelated-user-agent",
        "number":   "92",
        "title":    "handle errors on sending mails",
        "state":   "open",
        "labels": [],
        "kanbanState":   "0 - Backlog",
        "body":     "If mails can't be sent by the twisted process"
      }
    ];

    var contentToEncode = "Source;Github ID;Title;Status;Kanban State;Description;Tags;Create at;Closed at;Lead Time" +
                          "\npixelated-platform;90;\"sending mails\";open;1 - Ready;\"should send email\";\"\";;;" +
                          "\npixelated-user-agent;92;\"handle errors on sending mails\";open;0 - Backlog;\"If mails can't be sent by the twisted process\";\"\";;;\n";

    expect(this.component.linkToCsv({'issues': issues})).toEqual("data:text/csv;charset=utf8," + encodeURIComponent(contentToEncode));

    var newIssues = [{
        "projectName": "test-issues-ramon",
        "number":   "66",
        "labels": [],
        "title":    "handle errors on sending mails",
        "state":   "open",
        "kanbanState":   "1 - Backlog",
        "body":     "just testing an issue"
    }];

    var newIssuesToEncode = "test-issues-ramon;66;\"handle errors on sending mails\";open;1 - Backlog;\"just testing an issue\";\"\";;;\n";

    expect(this.component.linkToCsv({'issues': newIssues})).toEqual("data:text/csv;charset=utf8," + encodeURIComponent(contentToEncode + newIssuesToEncode));
  });

  it('should create the csv with proper issue`s lead time according to its create and closed date', function() {
    var issues = [
      {
        "projectName": "test-issues-leadTime-0",
        "body": "lead time description-0",
        "labels": [],
        "title": "",
        "created_at": "2014-11-18T13:29:41Z",
        "closed_at": "2014-11-19T13:28:41Z",
        "dev_at": "2014-11-18T14:00:41Z"
      },
      {
        "projectName": "test-issues-leadTime-1",
        "body": "lead time description-1",
        "labels": [],
        "title": "",
        "created_at": "2014-11-18T13:29:41Z",
        "closed_at": "2014-11-19T13:29:41Z",
        "dev_at": "2014-11-18T14:00:41Z"
      },
      {
        "projectName": "test-issues-leadTime-3",
        "body": "lead time description-3",
        "labels": [],
        "title": "",
        "created_at": "2014-11-18T13:29:41Z",
        "closed_at": "2014-11-21T13:30:41Z",
        "dev_at": "2014-11-20T13:00:41Z"
      }
    ];

    expect(this.component.linkToCsv({'issues': issues})).toEqual("data:text/csv;charset=utf8," + encodeURIComponent(
        "Source;Github ID;Title;Status;Kanban State;Description;Tags;Create at;Closed at;Lead Time" +
        "\ntest-issues-leadTime-0;;\"\";;;\"lead time description-0\";\"\";2014-11-18T13:29:41Z;2014-11-19T13:28:41Z;0" +
        "\ntest-issues-leadTime-1;;\"\";;;\"lead time description-1\";\"\";2014-11-18T13:29:41Z;2014-11-19T13:29:41Z;1" +
        "\ntest-issues-leadTime-3;;\"\";;;\"lead time description-3\";\"\";2014-11-18T13:29:41Z;2014-11-21T13:30:41Z;3\n"));
  });
});
