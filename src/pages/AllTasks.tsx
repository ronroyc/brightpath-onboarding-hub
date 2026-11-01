import ProgressBar from '../components/ProgressBar'
import TaskList from '../components/TaskList'
import { useApp } from '../state/context'

export default function AllTasks() {
  const { session, employees, today, toggleTask } = useApp()
  const me = employees.find((e) => e.id === session?.id)
  if (!me) return null
  const done = me.tasks.filter((t) => t.completedAt).length

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">All tasks</h1>
      <div className="mb-6 mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <ProgressBar done={done} total={me.tasks.length} label={`${done} of ${me.tasks.length} tasks complete`} />
      </div>
      <TaskList employee={me} today={today} canToggle onToggle={(id) => toggleTask(me.id, id)} />
    </div>
  )
}
