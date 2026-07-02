import { LightningElement } from 'lwc';

export default class ToDoApp extends LightningElement {

    inputTask= '';
    inputTaskdate = null;
    completeOpenTasks = [];
    completedTasks = [];

    dataHandler(event){
        let {name, value}  = event.target;
        if(name === 'tastfield'){
           this.inputTask = value;
         }else if(name === 'tastfiledate'){
            this.inputTaskdate = value;
         }
    }

    resetData(event){
        this.inputTask = '';
        this.inputTaskdate= null;
    }

    addHandler(event){
        
        if(!this.inputTaskdate){
            this.inputTaskdate = new Date().toISOString().slice(0, 10);
        }
        
        if(!this.validateData()) return;

     
               this.completeOpenTasks  = [...this.completeOpenTasks, {
                inputTask : this.inputTask,
                inputTaskdate : this.inputTaskdate
               }];

               let sArray = this.sortedArray(this.completeOpenTasks);
               this.completeOpenTasks = [...sArray];
            //reset the data on ui
            this.resetData();

    }


     validateData() {
        const dateInput = this.template.querySelector(".inputTaskdateclass");

        dateInput.setCustomValidity("");

        const foundItem = this.completeOpenTasks.find(
            task => task.inputTaskdate === this.inputTaskdate 
        );

        if (foundItem) {
            dateInput.setCustomValidity("This date is already scheduled.");
            dateInput.reportValidity();
            return false;
        }

        dateInput.reportValidity();
        return true;
    }

    sortedArray(inputArr){
        return inputArr.sort((a,b)=>{
            let adate = new Date(a.inputTaskdate);
            let bdate = new Date(b.inputTaskdate);
            return adate - bdate;
        });
    }



    deletedHandler(event){
        let index = event.target.name;
        this.completeOpenTasks.splice(index,1);
        this.completeOpenTasks = [...this.completeOpenTasks];
        let  sArray = this.sortedArray(this.completeOpenTasks);
        this.completeOpenTasks = [...sArray];

    }

    completedHandler(event){
        let index = event.target.name;
        let removeArray = this.completeOpenTasks.splice(index,1);
        this.completedTasks = [...this.completedTasks, removeArray[0]];
    }


      dragStartHandler(event){
                                  //custom name,       get the item
        event.dataTransfer.setData("index", event.target.dataset.item);
      }
        
      dragOverHandler(event){
        event.preventDefault();
      }
    
      allowItemHandler(event){
        event.preventDefault();
        let index = event.dataTransfer.getData("index");
        let dropd = this.completeOpenTasks.splice(index,1);
        let sArray = this.sortedArray(this.completeOpenTasks);
        this.completedTasks = [...this.completedTasks, dropd[0]];
        this.completeOpenTasks = [...sArray];
        
      }
    
}