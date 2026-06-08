import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSewadar from "./pages/AddSewadar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sewadar from "./pages/Sewadar";

import GatePass from "./pages/GatePass";
import LostAndFound from "./pages/LostAndFound";
import SewadarDetails from "./pages/SewadarDetails";
import MainLayout from "./layouts/MainLayout";
import CreateGatePass from "./pages/CreateGatePass";
import { SewaProvider } from "./context/SewaContext";
import CreateLostFound from "./pages/CreateLostFound";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <SewaProvider>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Home */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-lostfound"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateLostFound />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-gatepass"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateGatePass />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-sewadar"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AddSewadar />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sewadar-details"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SewadarDetails />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* Sewadar */}
          <Route
            path="/sewadar"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Sewadar />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* GatePass */}
          <Route
            path="/gatepass"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <GatePass />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Lost & Found */}
          <Route
            path="/lostfound"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <LostAndFound />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SewaProvider>
  );
}
