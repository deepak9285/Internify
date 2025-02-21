export async function PUT(req, { params }) {
    try {
      const { taskId } = params;
      const { status } = await req.json();
  
      if (!status) {
        return NextResponse.json({ message: "Status is required." }, { status: 400 });
      }
  
      // Find task and update status
      const task = await TaskProgress.findByIdAndUpdate(taskId, { status }, { new: true });
      if (!task) {
        return NextResponse.json({ message: "Task not found." }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Task status updated successfully." }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
  }
  