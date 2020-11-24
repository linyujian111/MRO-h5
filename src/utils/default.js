

export function URRestRequest(){
    this.requestData = {
            "condList":[],
            "orderByList":null,
            "selectFields":null,
            "currPage":1,
            "pageSize":20
          };
    this.addCondition = function(columnName,value,operator){
    	if(value!=null&&value!=""&&columnName!=null&&columnName!=""){
            var cond = {
                    "columnName":columnName,
                    "operator":operator,
                    "value":value
                  };
            this.requestData.condList.push(cond);    		
    	}
    };
    this.addOrderBy = function(columnName){
    	this.requestData.orderByList=this.requestData.orderByList||[];
    	if(columnName!=null&&columnName!=""){
            this.requestData.orderByList.push(columnName);    		
    	}
    };    
    this.addSelectField = function(columnName){
    	this.requestData.selectFields=this.requestData.selectFields||[];
    	if(columnName!=null&&columnName!=""){
            this.requestData.selectFields.push(columnName);    		
    	}
    };      
    this.setCurrPage = function(page){
    	this.requestData.currPage = page;
    };
    this.setPageSize = function(pageSize){
    	this.requestData.pageSize = pageSize;
    };    
    this.getRequestData = function(){
    	return this.requestData;
    }
}
