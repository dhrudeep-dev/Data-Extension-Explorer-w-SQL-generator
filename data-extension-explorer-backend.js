<script runat='server'>
  Platform.Load("core", "1.1.5");

  // Allow all origins (less secure)
  Platform.Response.SetResponseHeader('Access-Control-Allow-Origin', '*');
  Platform.Response.SetResponseHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  Platform.Response.SetResponseHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  Platform.Response.SetResponseHeader('Access-Control-Allow-Credentials', 'true');
  var response = {
  };
  var api = new Script.Util.WSProxy();
  function getDEFolder(id, list) {
    if (!id || id <= 0) {
      return list.join(" > ");
    }
    try {
      var results = Folder.Retrieve({
        Property:"ID", SimpleOperator:"equals", Value:id}
                                   );
      if (!results || results.length === 0) {
        return list.join(" > ");
      }
      list.unshift(Stringify(results[0].Name));
      if (results[0].ParentFolder && results[0].ParentFolder.ID) {
        return getDEFolder(results[0].ParentFolder.ID, list);
      }
      else {
        return list.join(" > ");
      }
    }
    catch(e) {
      return list.join(" > ");
    }
  }
  
  function getAttribute(customerKey){
    var fieldCols = ["Name", "IsRequired", "IsPrimaryKey", "FieldType", "MaxLength"];
    var resultDEs = api.retrieve("DataExtensionField", fieldCols, {
      Property: "DataExtension.CustomerKey",
      SimpleOperator: "equals",
      Value: customerKey
    });
    var fields = [];
    if (resultDEs && resultDEs.Results) {
      for (var i = 0; i < resultDEs.Results.length; i++) {
        var field = resultDEs.Results[i];
        fields.push({
          name: field.Name,
          required: field.IsRequired,
          displayName: field.Name,
          primaryKey: field.IsPrimaryKey,
          fieldType: field.FieldType,
          maxLength: field.MaxLength
        });
      }
    }
    return fields;
  }
  
  //get all preferences and prefilled values of subscriber
  if (Platform.Request.Method == 'GET') {
    
    var CategoryID = Request.GetQueryStringParameter('CategoryID');
    var deName = Request.GetQueryStringParameter('deName');
    var deCusKey = Request.GetQueryStringParameter('deCusKey');
    
    var isAttributecall = Request.GetQueryStringParameter('isAttributecall');
    
    if(deCusKey != null && isAttributecall == 'true'){
        var getAttributes = getAttribute(deCusKey);
      
        response['Attribites'] = getAttributes;
        response['deCusKey'] = deCusKey;
        response['success'] = true;
        response['statusCode'] = 1;
        response['message'] = "Attributes retrieved successfully";  
      
    } else if(CategoryID && CategoryID !== '' && isAttributecall != 'true' ){
      try {
        var list = [];
        list.push(deName);
        var folder = getDEFolder(CategoryID, list);
        response['folderPath'] = folder;
        response['list'] = deName;
        response['success'] = true;
        response['statusCode'] = 1;
        response['message'] = "Folder path retrieved successfully";
      }
      catch(e) {
        response['success'] = false;
        response['statusCode'] = -1;
        response['message'] = "Error getting folder path: " + Platform.Function.Stringify(e);
      }
    }
    else if(isAttributecall != 'true') {
      try {
        // First, collect all data extensions and their fields
        var dataExtensions = [];
        var cols = ["Name", "CustomerKey", "CategoryID", "CreatedDate"];
        var filter = {
          Property: "CustomerKey",
          SimpleOperator: "isNotNull",
          Value: " "
        };
        var opts = {
          BatchSize: 2500
        };
        var props = {
          QueryAllAccounts: false
        };
         var moreData = true,
            reqID = null;
  
        while(moreData) {
            moreData = false;
            if(reqID) props.ContinueRequest = reqID;
  
            var req = api.retrieve("DataExtension", cols, filter, opts, props);
           
            if (req) {
             // moreData = req.HasMoreRows;
                moreData = false;
                reqID = req.RequestID;
                var results = req.Results;
  
                for (var k in results) {
                    var name = results[k].Name;
                    var customerKey = results[k].CustomerKey;
                    var CategoryID = results[k].CategoryID;
                    var CreatedDate = results[k].CreatedDate;  
                    // Skip system data extensions (those starting with underscore)
                    if (name.indexOf("_") === 0) continue;
  
                  dataExtensions.push({
                    name: name,
                    CategoryID: CategoryID,
                    customerKey: customerKey,
                    CreatedDate: CreatedDate,
                    fields: ['ab','cs']
                  });
                }
            }
        }
            
        response['folderPath'] = folder;
        response['dataExtensions'] = dataExtensions;
        response['success'] = true;
        response['statusCode'] = 1;
        response['message'] = "Data extensions retrieved successfully";
      }
      catch(e) {
        response['success'] = false;
        response['statusCode'] = -1;
        response['message'] = "Error retrieving data extensions: " + Platform.Function.Stringify(e);
      }
    }
  }
  else if (Platform.Request.Method=='POST')
  {
    try{
    }
    catch(e) {
      response['success'] = true;
      response['statusCode'] = -1;
      response['message'] = Platform.Function.Stringify(e);
    }
  }
  Platform.Response.Write(Platform.Function.Stringify(response));
</script>
