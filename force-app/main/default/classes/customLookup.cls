public with sharing class customLookup {
    @AuraEnabled(cacheable=true)
    public static List<sObject> getCustomLookup(String objectApiName, String searchingName){
        String key = '%' + searchingName +'%';
        List<SObject> queriedData = new List<SObject>();
        if(String.isNotBlank(searchingName)){
            String query = 'select Id, Name from '+objectApiName + ' where Name like :key';
            queriedData =  Database.query(query, AccessLevel.USER_MODE);
        }
        return queriedData;
       
    }
}