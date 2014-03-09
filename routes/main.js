var handler = require('../handlers');
var products = require('../handlers/products');
var admin = require('../handlers/admin');

app.get('/', handler.index);
app.get('/admin', admin.index);
app.get('/admin/products', admin.product_list);
app.all('/admin/products/new', admin.new_product);

app.get('/admin/brands', admin.brand_list);
app.all('/admin/brands/new', admin.new_brand);

app.get('/products', products.list);
app.get('/products/new', products.newform);
app.post('/products/add', products.addnew);