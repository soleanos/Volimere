/**
 * Created by tamiand on 25/04/2016.
 */

var ldap = require('ladapjs');

var server = ldap.createServer();

server.search('OU=Employees,DC=corp,DC=capgemini,DC=com', function(req, res, next){

})

server.listen(389, function(){
    console.log('/etc/passwd LDAP server up at: %s', server.url);
})



// ## Gestion du module ldap
// ldapAdServer = ldap://corp.capgemini.com:389
// ldapSearchBase = OU=Employees,DC=corp,DC=capgemini,DC=com
// ldapSecurity = none
// ldapContext = com.sun.jndi.ldap.LdapCtxFactory