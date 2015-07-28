describe("ACL on CloudObject Notifications", function () {

    it("Should create new user and listen to CloudNotifiction events.", function (done) {

        this.timeout(20000);

        var username = util.makeString();
        var passwd = "abcd";
        var userObj = new CB.CloudUser();

        userObj.set('username', username);
        userObj.set('password',passwd);
        userObj.set('email',util.makeEmail());
        userObj.signUp().then(function(user) {
            
            CB.CloudObject.on('User', 'created', function(){
                CB.CloudObject.off('User','created');
                done();
            });

            var username = util.makeString();
            var passwd = "abcd";
            var userObj = new CB.CloudUser();

            userObj.set('username', username);
            userObj.set('password',passwd);
            userObj.set('email',util.makeEmail());

            userObj.save();
           
        }, function (error) {
            done("user create error");
        });

    });

    it("Should NOT receieve a  notification when public read access is false;", function (done) {

        this.timeout(30000);

        var username = util.makeString();
        var passwd = "abcd";
        var userObj = new CB.CloudUser();

        userObj.set('username', username);
        userObj.set('password',passwd);
        userObj.set('email',util.makeEmail());
        userObj.signUp().then(function(user) {
            
            CB.CloudObject.on('User', 'created', function(data){
                CB.CloudObject.off('User','created');
                done("Sent notification when set public read access is false");
            });

            var username = util.makeString();
            var passwd = "abcd";
            var userObj = new CB.CloudUser();

            userObj.set('username', username);
            userObj.set('password',passwd);
            userObj.set('email',util.makeEmail());

            userObj.ACL = new CB.ACL();
            userObj.ACL.setPublicReadAccess(false);

            userObj.save();

            setTimeout(function(){ 
                console.log('Done!');
                done(); 

            }, 1000); //wait for sometime and done! 
           
        }, function (error) {
            throw "user create error";
        });

    });

    it("Should NOT receivee an event when user read access is false;", function (done) {

        this.timeout(30000);

        var username = util.makeString();
        var passwd = "abcd";
        var userObj = new CB.CloudUser();

        userObj.set('username', username);
        userObj.set('password',passwd);
        userObj.set('email',util.makeEmail());
        userObj.signUp().then(function(user) {
            
            CB.CloudObject.on('User', 'created', function(){
                CB.CloudObject.off('User','created');
                done("Sent notification when set public read access is false");
            });

            var username = util.makeString();
            var passwd = "abcd";
            var userObj = new CB.CloudUser();

            userObj.set('username', username);
            userObj.set('password',passwd);
            userObj.set('email',util.makeEmail());

            userObj.ACL = new CB.ACL();
            userObj.ACL.setUserReadAccess(user.id, false);

            userObj.save();

            setTimeout(function(){ 
               done();
            }, 10000); //wait for sometime and done! 
           
        }, function (error) {
            done("user create error");
        });

    });

    it("Should NOT receieve a  notification when public read access is true but user is false;", function (done) {

        this.timeout(30000);

        var username = util.makeString();
        var passwd = "abcd";
        var userObj = new CB.CloudUser();

        userObj.set('username', username);
        userObj.set('password',passwd);
        userObj.set('email',util.makeEmail());
        userObj.signUp().then(function(user) {
            
            CB.CloudObject.on('User', 'created', function(){
                CB.CloudObject.off('User','created');
                done("Sent notification when set public read access is false");
            });

            var username = util.makeString();
            var passwd = "abcd";
            var userObj = new CB.CloudUser();

            userObj.set('username', username);
            userObj.set('password',passwd);
            userObj.set('email',util.makeEmail());

            userObj.ACL = new CB.ACL();
            userObj.ACL.setPublicReadAccess(true);
            userObj.ACL.setUserReadAccess(user.id, false);

            userObj.save();

            setTimeout(function(){ done(); }, 10000); //wait for sometime and done! 
           
        }, function (error) {
            done("user create error");
        });

    });


    it("Should receieve a notification when public read access is false but user is true;", function (done) {

        this.timeout(30000);

        var username = util.makeString();
        var passwd = "abcd";
        var userObj = new CB.CloudUser();

        userObj.set('username', username);
        userObj.set('password',passwd);
        userObj.set('email',util.makeEmail());
        userObj.signUp().then(function(user) {
            
            CB.CloudObject.on('User', 'created', function(){
               CB.CloudObject.off('User','created');
               done();
            });

            var username = util.makeString();
            var passwd = "abcd";
            var userObj = new CB.CloudUser();

            userObj.set('username', username);
            userObj.set('password',passwd);
            userObj.set('email',util.makeEmail());

            userObj.ACL = new CB.ACL();
            userObj.ACL.setPublicReadAccess(false);
            userObj.ACL.setUserReadAccess(user.id, true);

            userObj.save();

        }, function (error) {
            done("user create error");
        });

    });
});

