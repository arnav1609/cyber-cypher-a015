// app/questionnaire/page.tsx
import React from 'react';
import MentorMenteeForm from '@/components/MentorMenteeForm';

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <MentorMenteeForm />
    </div>
  );
}
