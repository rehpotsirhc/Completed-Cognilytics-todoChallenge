/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function () {
			$scope.remainingCount = $filter('filter')(todos, { done: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ done: false } : (status === 'completed') ?
				{ done: true } : {};
		});

		$scope.addTodo = function () {
			var newTodo = {
				task: $scope.newTodo.trim()
			};

			if (!newTodo.task) {
				return;
			}

			$scope.saving = true;
			store.insert(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				})
				.finally(function () {
					$scope.saving = false;
				});
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.saveEdits = function (todo, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Todo edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			todo.task = todo.task.trim();

			if (todo.task === $scope.originalTodo.task) {
				$scope.editedTodo = null;
				return;
			}

			store[todo.task ? 'put' : 'delete'](todo)
				.then(function success() {}, function error() {
					todo.task = $scope.originalTodo.task;
				})
				.finally(function () {
					$scope.editedTodo = null;
				});
		};

		$scope.revertEdits = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.editedTodo = null;
			$scope.originalTodo = null;
			$scope.reverted = true;
		};

		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};

		$scope.saveTodo = function (todo) {
			store.put(todo);
		};

		$scope.toggleCompleted = function (todo, done) {
			if (angular.isDefined(done)) {
				todo.done = done;
			}
			store.put(todo, todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.done = !todo.done;
				});
		};

		$scope.clearCompletedTodos = function () {
			store.clearCompleted();
		};

		$scope.markAll = function (done) {
			todos.forEach(function (todo) {
				if (todo.done !== done) {
					$scope.toggleCompleted(todo, done);
				}
			});
		};

		$scope.cloneTodo = function (todo) {
			
			var originalTodos = store.todos.slice(0);
			//first add a new record using save (POST), which copies of the task text
			store.api.save(todo, function success(resp) { 
				//update the view
				store.todos.push(resp);
				//update the done field
				resp.done = todo.done;
				store.put(resp, todos.indexOf(resp))
				//$scope.toggleCompleted(resp, todo.done);
				}, 
				function error(){ angular.copy(originalTodos, store.todos);
				});
			}

	});