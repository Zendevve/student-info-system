<div className="flex items-center justify-between pt-4 border-t border-secondary-100">
  <div className="flex items-center gap-1.5 text-sm text-secondary-600">
    <Users size={16} className="text-secondary-400" />
    <span className="font-medium">{course.students} students</span>
  </div>
  <div className="flex items-center gap-1.5 text-sm text-secondary-600">
    <Clock size={16} className="text-secondary-400" />
    <span className="font-medium">{course.units} units</span>
  </div>
</div>
            </Card >
          ))}
        </div >
      ) : (
  <Card className="border-none shadow-sm overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-secondary-50 border-b border-secondary-200">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Course</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Grade Level</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Category</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Students</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">Units</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-secondary-200">
        {filteredCourses.map((course, index) => (
          <tr key={course.id} className="hover:bg-secondary-50/50 transition-colors group cursor-pointer">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", getIconColor(index))}>
                  <Book className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">{course.name}</p>
                  <p className="text-xs text-secondary-500">{course.code}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-secondary-600">{course.gradeLevel}</td>
            <td className="px-6 py-4">
              <span className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                course.category === 'Core' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
              )}>
                {course.category}
              </span>
            </td>
            <td className="px-6 py-4 font-medium text-secondary-900">{course.students}</td>
            <td className="px-6 py-4 font-medium text-secondary-900">{course.units}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
)}
    </div >
  )
}
