import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { contactUsFetchApi, getContactsFetchApi } from "../redux/User/UserThunk";

export default function ContactUs() {

    const dispatch=useDispatch()
  const [formdata, setFormdata] = useState({
    name: "",
    ConatctNo: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      

      console.log(formdata)

   

    try {
      const response = await dispatch(
        contactUsFetchApi({formdata,setFormdata,toast})
      );
      console.log("Contact submitted successfully:", response);

      dispatch(getContactsFetchApi())
      setFormdata({
        name: "",
    ConatctNo: "",
    email: "",
    message: "",
      })

    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="card p-4">
                <h5 className="mb-4 text-center text-[20px]">Contact </h5>

                <div className="form-group">
                  <h6>Full Name :</h6>
                  <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <h6>Contact Number :</h6>
                  <input
                    name="ConatctNo"
                    type="number"
                    value={formdata.ConatctNo}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="form-group">
                  <h6>Email :</h6>
                  <input
                    name="email"
                    type="email"
                    value={formdata.email}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="form-group">
                  <h6>Message :</h6>
                  <textarea
                    name="message"
                    rows={5}
                    cols={10}
                    value={formdata.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card p-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29370.761108796953!2d72.65020866806891!3d23.047804906339437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e86d53c2ed683%3A0x161958a4f45e809a!2sNikol%2C%20Ahmedabad%2C%20Gujarat%20380038!5e0!3m2!1sen!2sin!4v1726466849459!5m2!1sen!2sin"
                  width="600"
                  height="560"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-3 btn-blue w-100">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
