// what does configureStore do? ✅
// what does createSlice do? ✅
// what does PayloadAction do? represents an action with a specific payload type ✅
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}
// TodoSliceState is the type of the state managed by the todos slice
interface TodosSliceState {
	todos: Todo[];
}

// is initialState is the initial state of the TodoSlice? yes ✅
const initialState: TodosSliceState = {
	todos: [],
}

// The slice for the todos
export const todosSlice = createSlice({
	name: 'counter',
	initialState,
	// reducers are functions that define how the state can be updated is this statement correct? ✅
	reducers: {
		// what is action: PayloadAction<string>? ✅
		addTodo: (state, action: PayloadAction<string>) => {
			state.todos.push({
				id: state.todos.length + 1,
				title: action.payload,
				completed: false
			});
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload);
		},
	},
})

// what is the differnce b/w actions and reducers as reducers are also functions that define how the state can be updated? ✅

// When you call todosSlice.actions.addTodo("New Task"), it creates an action like:
// { type: 'todos/addTodo', payload: "New Task" } ✅
// below addTodo and removeTodo are action creators ✅
export const { addTodo, removeTodo } = todosSlice.actions

// what are reducers? ✅
// what are actions? ✅
// is there difference between reducers and reducer? ✅
const store = configureStore({
	reducer: {
		todos: todosSlice.reducer,
	},
})

// what is type of store.getState()?
export type RootState = ReturnType<typeof store.getState>

// what does this do? and why is it needed?
export const selectTodos = (state: RootState) => state.todos.todos


export default store;