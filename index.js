exports.apply = function(app, component, logger = console.log) {
	component.routes.forEach((route) => {
		if(route.method.constructor.name == 'String') route.method = [route.method];
		route.method.forEach((method) => {
			if(route.handler.constructor.name == 'Function') route.handler = [route.handler];
			if(method.toLocaleUpperCase() == 'USE') {
				route.handler.forEach((func) => {
					logger(`Adding middleware: ${func.name}`);
					app.use(func);
				});
			} else {
				logger(`Adding route: ${method.toLocaleUpperCase()} ${route.uri} -> ${route.handler.name}`);
				app[method](route.uri, ...route.handler);
			}
		});
	});
};
