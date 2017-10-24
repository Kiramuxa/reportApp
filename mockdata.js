var casual = require('casual');

var db = {
    orders: [],
    employees: [],
    products: [],
    reports: [],
    machines: []
};

// Наполнение orders
for(var i=101; i<=1000; i++) {
    var order = {};

    // ID заказа
    order.id = i;
    //------------//

    //------------ названия изделия ---------//
    var mainPrefix = 'МДМ';
    var prefixNumber = casual.random_element([
        '5','7.5','15','30','60','120','160','240','480'
    ]);
    var amountChannels = casual.random_element(['1','2','3']);
    var channelPostfix = casual.random_element(['А','В','Д','Е']);
    var voltage = casual.integer(1,27);
    var postFix = casual.random_element(['М','МУ','ТУ','МУП','ТУП']);
    order.productName =  mainPrefix + prefixNumber + '-' +
        amountChannels + channelPostfix + voltage + postFix;

    //----------внутренний номер заказа---------------//
    var innerID_prefix = casual.random_element(['A','F']);
    var innerID_number = casual.integer(100000,999999);
    order.innerID = innerID_prefix + innerID_number;

    //--------------количество модулей------------------------------//
    order.amount = casual.random_element([12,16]); 

    //---------------оператор станка --------------------------//
    order.machineOperatorIdBOT = casual.integer(1, 10);
    order.machineOperatorIdTOP = casual.integer(1, 10);

    //----------------флаг литеры/------------------//
    if (innerID_prefix == 'A') 
          order.literaStatus = true
    else  order.literaStatus = false;

    //----------------статус------------------------//
    order.status = casual.random_element(['ожидает','в работе','готов']);

    //----------------дата изготовления-------------------//
    if(order.status == 'готов') {
        order.date = randomDate(new Date(2015,1,1), Date.now());
    }

    function randomDate(date1, date2){              
      var randDate = randomInt(Number(date1), Number(date2));
      return new Date(randDate);
    }    
    function randomInt(min, max) {
      return Math.round(Math.random()*(max-min)+min);
    }

    //-------------Добавление заказа в массив----------------------//
    db.orders.push(order);
};

// Наполнение employees
db.employees = [
    {
        "id": 1,
        "name": "Кирилл",
        "surname": "Михеев",
        "machine": "MHP"
    },
    {
        "id": 2,
        "name": "Иван",
        "surname": "Тришкин",
        "machine": "Luna"
    },
    {
        "id": 3,
        "name": "Иван",
        "surname": "Чуваков",
        "machine": "Pantera XV-2"
    },
    {
        "id": 4,
        "name": "Дмитрий",
        "surname": "Данилевский",
        "machine": "Pantera"
    },
    {
        "id": 5,
        "name": "Александр",
        "surname": "Четвернин",
        "machine": "Pantera XV-2"
    },
    {
        "id": 6,
        "name": "Александр",
        "surname": "Непряхин",
        "machine": "Pantera XV-1"
    },
    {
        "id": 7,
        "name": "Дмитрий",
        "surname": "Непряхин",
        "machine": "Pantera"
    },
    {
        "id": 8,
        "name": "Константин",
        "surname": "Пережогин",
        "machine": "Luna"
    },
    {
        "id": 9,
        "name": "Артём",
        "surname": "Полетавкин",
        "machine": "Pantera XV-1"
    },
    {
        "id": 10,
        "name": "Дмитрий",
        "surname": "Ульянов",
        "machine": "MHP"
    }
];

//Наполнение products
db.products = [];

//наполнение machines
db.machines = [
    {
        'id': 0,
        'name': 'Pantera'
    },
    {
        'id': 0,
        'name': 'Pantera XV-1'
    },
    {
        'id': 0,
        'name': 'Pantera XV-2'
    },
    {
        'id': 0,
        'name': 'MHP'
    },
    {
        'id': 0,
        'name': 'Luna'
    }

];

//Наполнение reports
var date = new Date();
for (var i = 0; i <= 100; i++) {
    date.setDate(date.getDate() - 1);
    for (var j = 0; j < 5; j++) {
        var report = {};
        
        report.id = i + '' + j;
        
        report.date = new Date(date);
        
        report.machine = casual.random_element(
            db.machines
        );

        report.operator = casual.random_element(
            db.employees
        )

        report.shiftOneOrders = [
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders)
        ];

        report.shiftTwoOrders = [
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders),
            casual.random_element(db.orders)
        ];

        db.reports.push(report);
    }
} 





console.log(JSON.stringify(db));