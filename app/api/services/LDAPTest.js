var ldap = require('ldapjs');
exports.searchLDAP = _searchLDAP;

function _searchLDAP (req, res) {

    var client = ldap.createClient({url: 'ldap://corp.capgemini.com:389'})

    client.bind('cn=Manager,dc=foo,dc=com', kredito231, function(err) {
        if (err) {
            console.log(err);
            client.unbind();
            return;
        }

        var opts = {
            filter: (('Email=*@foo.com'))
        } ;

        client.search('OU=Employees,DC=corp,DC=capgemini,DC=com', opts, function(err, res) {
            res.on('searchEntry', function(entry) {
                console.log('hit');
                console.log('entry: ' + JSON.stringify(entry.object));
            });
            res.on('searchReference', function(referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function(err) {
                console.log('searchFailed') ;
                console.error('error: ' + err.message);
            });
            res.on('end', function(result) {
                console.log('4') ;
                console.log('status: ' + result.status);
            });
        });

    });
}
//ldapAdServer = ldap://corp.capgemini.com:389
//ldapSearchBase = OU=Employees,DC=corp,DC=capgemini,DC=com
//ldapSecurity = none
