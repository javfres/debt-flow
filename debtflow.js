
const Tree = require('./tree');

class DebtFlow {
    
    constructor(){
    
        this.people = [];
        this.expenses = [];
        this.debts = [];
        
    }
    
    addPeople(who){    
    
        for(let i=0; i<this.people.length; i++){
            if(this.people[i] === who) return;
        }
        this.people.push(who);

    }
    
    addExpense(who, amount, concept, to = null){
        
        this.addPeople(who);
        if(to){
            to.map(who => this.addPeople(who));
            to.push(who);
        }
        
        this.expenses.push({who, amount, concept, to});
                
    }
    
    addDebt(who, amount, to, concept = null){
    
        // Just in case
        this.addPeople(who);
        this.addPeople(to);

        this.debts.push({who, amount, concept, to});
        
    }
    
    flow(){
        
        console.log("=== People ===");
        this.people.map(p => {
            console.log("* " + p);
        })
        
        console.log("=== Expenses ===");
        this.expenses.map(e => {
            let to = "ALL";
            if(e.to){
                to = e.to.join();
            }
            console.log("* " + e.amount + "€ " + e.who + " [" + e.concept + "] " + to);
        })
        
        // Process debts
        this.expenses.map(e => {
            
            let to = e.to ? e.to : this.people;
            to.map(t => {
                if(e.who === t) return;
                
                this.addDebt(t, e.amount / to.length, e.who, e.concept);
            });
        });
        
        
        console.log("=== Debts ===");
        this.debts.map(d => {
            console.log("* " + d.amount + "€ " + d.who + " [" + d.concept + "] " + d.to);
        })
        
        
        
        const tree = new Tree();
        
        
        this.people.map(a => {
            this.people.map(b => {
                console.log(a,"<->",b);
                tree.set(a,b,0);
                tree.set(b,a,0);
            });
        });
        
        
        
        this.debts.map(d => {
            
            // Set 1
            let amount = tree.get(d.who, d.to);
            if(!amount) amount = 0;
            amount += d.amount;
            tree.set(d.who, d.to, amount);
            
            let amount_inv = tree.get(d.to, d.who);
            if(!amount_inv) amount_inv = 0;
            tree.set(d.to, d.who, amount_inv);            
        })
        
        
        console.log("=== Tree 0 ===");
        tree.map( (a,b,v, vobj) => {
            console.log("--", a,"->",b, ":",v,"$");
        });
        
        /*
        // Compensate own debt
        tree.map((a,b,v) => {
            const vi = tree.get(b,a);
            const m = Math.min(v,vi);
            if(m === 0) return;
            
            tree.set(a,b,v-m);
            tree.set(b,a,vi-m);

        });
        */
        
        
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
        
        
        

        console.log("=== Tree 1 ===");
        tree.map( (a,b,v, vobj) => {
            console.log("--", a,"->",b, ":",v,"$");
        });


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
                        
                        console.log("Yeah");
                        reduced=true;
                        
                        tree.set(a,b,d_ab-m);
                        tree.set(b,c,d_bc-m);
                        tree.set(a,c,d_ac+m);

                    });
                });
            });
        }

        
        
        

        console.log("=== Tree 2 ===");
        tree.map( (a,b,v, vobj) => {
            if(v === 0) return;
            console.log("--", a,"->",b, ":",v,"$");
        });


            
        
    } // flow
    
}


module.exports = DebtFlow;
