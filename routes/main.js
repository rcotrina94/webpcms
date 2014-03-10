var root = require('../handlers');
var admin = require('../handlers/admin');

/* Index */
app.get('/', root.index);

/* Admin */
app.get('/admin', admin.index);

app.get('/admin/products', admin.product_list);
app.get('/admin/brands', admin.brand_list);

app.all('/admin/products/new', admin.new_product);
app.all('/admin/brands/new', admin.new_brand);
