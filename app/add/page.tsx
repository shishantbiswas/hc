import AddLink from "@/components/add-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add URL",
};

export default function Add() {
  return <AddLink />;
}
