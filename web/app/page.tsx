"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import FerrisIcon from "@/components/ferris-icon"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Rust 공부하기", completed: false },
    { id: 2, text: "웹 애플리케이션 만들기", completed: true },
    { id: 3, text: "Ferris 그림 그리기", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() === "") return
    const newId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
    setTodos([...todos, { id: newId, text: newTodo, completed: false }])
    setNewTodo("")
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center">
      <div className="w-full max-w-md bg-orange-50 flex flex-col min-h-screen relative">
        {/* 모바일 친화적인 헤더 */}
        <div className="bg-orange-500 text-white p-4 sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-center">
            <FerrisIcon className="w-7 h-7 mr-2" />
            <h1 className="text-xl font-bold">Ferris Todo</h1>
          </div>
        </div>

        {/* 모바일 친화적인 입력 폼 */}
        <div className="p-4 sticky top-16 bg-white z-10 shadow-sm">
          <div className="flex space-x-2">
            <Input
              placeholder="할 일을 입력하세요..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo()
              }}
              className="flex-1 h-12 text-base"
            />
            <Button
              onClick={addTodo}
              className="bg-orange-500 hover:bg-orange-600 h-12 w-12 p-0"
              aria-label="할 일 추가"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 할 일 목록 */}
        <div className="p-4">
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FerrisIcon className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-muted-foreground">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    todo.completed ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200"
                  } shadow-sm`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border-orange-500 data-[state=checked]:bg-orange-500 h-5 w-5"
                    />
                    <span className={`${todo.completed ? "line-through text-muted-foreground" : ""} text-base`}>
                      {todo.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10"
                    aria-label="할 일 삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* 모바일 친화적인 통계 푸터 */}
          {todos.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
              <p className="text-sm text-muted-foreground">
                완료된 할 일: {todos.filter((todo) => todo.completed).length}/{todos.length}
              </p>
            </div>
          )}
        </div>

        {/* 모바일 안전 영역 */}
        <div className="h-16"></div>
      </div>
    </div>
  )
}
