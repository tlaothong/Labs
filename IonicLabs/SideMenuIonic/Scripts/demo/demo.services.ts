module demo {
	'use strict';

	export interface IDataService {
        getAll(): void;
        get(id: string): any;
	}

    export class DataService implements IDataService {

        private svc: angular.resource.IResourceClass<any>;

        static $inject = ['$resource'];
        constructor(private $resource: angular.resource.IResourceService) {
            // TODO: initialize service
            this.svc = $resource('http://moman.azurewebsites.net/mgw/api/' + 'demo1');
		}

        public getAll(): angular.IPromise<any> {
            // TODO: Implement or remove a method
            return this.svc.query().$promise;
        }

        public get(id: string): any {
            return this.svc.get({ id: id });
        }

	}

	angular
		.module('demo', ['ngResource'])
		.service('demo.DataService', DataService);
}