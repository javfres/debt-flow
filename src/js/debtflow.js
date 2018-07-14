
const Tree = require('./tree');
const util = require("util");

//
// The class the simplifies the debts
//
class DebtFlow {
    
    //
    // Constructor
    //
    constructor(){
        this.people = [];
        this.expenses = [];
        this.debts = [];
    } // constructor
    
    //
    // Add a new person (Ignore if duplicated)
    //
    addPeople(who){    
        for(let i=0; i<this.people.length; i++){
            if(this.people[i] === who) return;
        }
        this.people.push(who);
    } // addPeople
    
    
    //
    // Add a common expense
    // If to is null to all the group or to an array of users
    //
    addExpense(who, amount, concept, to = null){
        
        this.addPeople(who);
        if(to){
            to.map(who => this.addPeople(who));
        }
        this.expenses.push({who, amount, concept, to});
    } // addExpense
    
    //
    // Add a Debt
    // A debt is only between two persons
    //
    addDebt(who, amount, to, concept = null){
    
        // Just in case
        //this.addPeople(who);
        //this.addPeople(to);

        this.debts.push({who, amount, concept, to});
        
    } // addDebt
    
    
    //
    // Generate the debts from the expenses
    //
    process_debts(){
        
        this.debts = [];
        
        this.expenses.map(e => {
            
            let to = this.people;
            if(e.to){
                to = e.to.map(x=>x); // To clone
            }
            
            to.map(t => {
                if(e.who === t) return;
                this.addDebt(t, e.amount / to.length, e.who, e.concept);
            });
        });
        
    } // process_debts
    
    
    
    //
    // Calculate what had paid each one and what should they pay
    //
    info(){
        
        this.process_debts();
        
        let info;
        
        function get_idx(name){
            for(let i=0; i<info.length; i++){
                if(info[i].name === name) return i;
            }
            return undefined;
        }
        
        info = this.people.map(p => {
            return {
                name:p,
                expenses: [],
                total_expenses: 0,
                debts: [],
                total_debts: 0,
                bote: 0,
            };
        });
        
        // Add the expenses
        this.expenses.map(e => {
            
            let idx = get_idx(e.who);
            info[idx].expenses.push({
                to:e.to,
                amount:e.amount,
                concept:e.concept,
                himself:e.himself
            });
        });
        
        // Add the Debts
        this.debts.map(d => {
            
            let idx = get_idx(d.who);
            info[idx].debts.push({
                to:d.to,
                amount:d.amount,
                concept:d.concept,
            });
        });
                
        
        function reduce_amount(pre, cur){
            return pre + cur.amount;
        }
        
        
        // Calculate totals
        this.people.map((p,i) => {
            
            info[i].total_expenses = info[i].expenses.reduce(reduce_amount, 0);
            info[i].total_debts = info[i].debts.reduce(reduce_amount, 0);

            info[i].bote = info[i].total_debts-info[i].total_expenses;

        });
        
        
        //console.log(util.inspect(info, false, null, true));
        
        return info;
        
    }
    
    
    
    //
    // The simplify algorithm
    //
    flow(only_known = false){
        
        this.process_debts();

        // Create a new tree
        const tree = new Tree();
        
        //
        // Add all to all
        //
        if(!only_known){
            this.people.map(a => {
                this.people.map(b => {
                    tree.set(a,b,0);
                    tree.set(b,a,0);
                });
            });
        }
            
        //
        // Build the tree
        //
        this.debts.map(d => {
            // Set 1
            let amount = tree.get(d.who, d.to);
            if(!amount) amount = 0;
            amount += d.amount;
            tree.set(d.who, d.to, amount);
            
            let amount_inv = tree.get(d.to, d.who);
            if(!amount_inv) amount_inv = 0;
            tree.set(d.to, d.who, amount_inv);            
        });
        
        //tree.debug("Tree 0");

        //
        // Simplify between people
        //
        this.people.map(a => {
            this.people.map(b => {
                
                const v =  tree.get(a,b);
                const vi = tree.get(b,a);
                const m = Math.min(v,vi);
                if(m === 0) return;
                
                tree.set(a,b,v-m);
                tree.set(b,a,vi-m);
            });
        });
        
        //tree.debug("Tree 1");

        //
        // Simplify with a pivot
        //
        let reduced = true;
        while(reduced){
            
            reduced = false;
            this.people.map(a => {
                this.people.map(b => {
                    this.people.map(c => {
                        
                        const d_ab =  tree.get(a,b);
                        const d_bc =  tree.get(b,c);

                        const m = Math.min(d_ab,d_bc);
                        if(m === 0) return;
                        
                        const d_ac = tree.get(a,c);
                        if(d_ac === null) return;
                        
                        reduced=true;
                        
                        tree.set(a,b,d_ab-m);
                        tree.set(b,c,d_bc-m);
                        tree.set(a,c,d_ac+m);

                    });
                });
            });
        }

        //tree.debug("Tree 2");


        //
        // Build final flow
        //

        let flow = [];
        
        function get_idx(name){
            for(let i=0; i<flow.length; i++){
                if(flow[i].name === name) return i;
            }
            return null;
        }
        
        // Calculate stats
        const stats = {
            num_pays: 0,
            money_moved: 0,
            max_pay: 0,
            min_pay: 0,
        };
        
        tree.map((a,b,v) => {
            
            if(v<=0) return;
            
            let idx = get_idx(a);
            if(idx === null){
                flow.push({name:a, pays:[]});
                idx = flow.length-1;
            }
            
            stats.num_pays++;
            stats.money_moved+=v;
            stats.max_pay = stats.max_pay === 0 ? v : Math.max(stats.max_pay,v);
            stats.min_pay = stats.min_pay === 0 ? v : Math.min(stats.min_pay,v);

            flow[idx].pays.push({name:b, amount:v});
            
        });
        
        

        
        
        
        
        
        
        const res = {flow, stats};
        
        
        

        //console.log(util.inspect(res, false, null, true));


        return res;

            
        
    } // flow
    
}


module.exports = DebtFlow;
