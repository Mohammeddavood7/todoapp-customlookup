public with sharing class WireDecorator {
 
    @AuraEnabled(cacheable=true)public static List<Account> getAccounts(){
        return [select Id, Name, Industry, Rating from account with USER_MODE limit 10];
    }
}