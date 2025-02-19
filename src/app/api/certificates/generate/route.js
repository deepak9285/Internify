import CertificateModel from "@/models/Certificate.model";
import { connectDb } from "@/utils/connectDb";

export async function GET(req, { params }) {
    connectDb();
    try {
      const { studentId } = params;
  
      // Fetch all certificates for the student
      const certificates = await CertificateModel.find({ student: studentId });
      if (!certificates.length) {
        return NextResponse.json({ message: "No certificates found." }, { status: 404 });
      }
  
      return NextResponse.json({ certificates }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
  }
  