"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function DesignSystemPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-heading font-bold text-primary">Design System</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Explore India</Button>
          <Button variant="sos">SOS EMERGENCY</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">Inputs & Cards</h2>
        <Card className="max-w-md space-y-4">
          <h3 className="font-heading font-semibold">Sample Form Card</h3>
          <Input id="sample-name" label="Full Name" placeholder="Enter your name" />
          <Button variant="primary" className="w-full">Submit</Button>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">Modals</h2>
        <Button onClick={() => setModalOpen(true)}>Open Sample Modal</Button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h3 className="font-heading font-bold text-xl mb-4">Important Information</h3>
          <p className="text-text-secondary mb-6">
            This is an AI-assisted tool. The information provided may not be accurate or legally authoritative.
          </p>
          <Button variant="primary" onClick={() => setModalOpen(false)}>I Understand</Button>
        </Modal>
      </section>
    </main>
  );
}