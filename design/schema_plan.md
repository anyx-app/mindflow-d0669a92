# Schema Plan - MindFlow

## Overview
This schema is designed to support a private journaling and mood tracking application with secure sharing capabilities for therapists.

## Tables

### 1. `profiles`
Extends the default Supabase `auth.users` table to store application-specific user data.
- **id** (uuid, PK): References `auth.users.id`. Cascade delete.
- **full_name** (text): User's display name.
- **avatar_url** (text): URL to profile image.
- **is_therapist** (boolean): Flag to distinguish between regular users and therapists. Default `false`.
- **created_at** (timestamptz): Default `now()`.
- **updated_at** (timestamptz): Default `now()`.

### 2. `mood_logs`
Stores daily mood check-ins and emotional states.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **user_id** (uuid, FK): References `profiles.id`. Cascade delete.
- **mood_score** (integer): Numerical representation of mood (e.g., 1-5 or 1-10).
- **emotions** (text[]): Array of tags describing specific emotions (e.g., ["anxious", "hopeful"]).
- **note** (text): Optional short note context for the mood.
- **created_at** (timestamptz): Default `now()`.

### 3. `journal_prompts`
Stores guided prompts to help users start writing.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **content** (text): The prompt text (e.g., "What made you smile today?").
- **category** (text): Classification (e.g., "Gratitude", "Anxiety", "Daily Reflection").
- **is_active** (boolean): Soft delete mechanism. Default `true`.

### 4. `journal_entries`
Stores the actual journal content written by users.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **user_id** (uuid, FK): References `profiles.id`. Cascade delete.
- **prompt_id** (uuid, FK, Nullable): References `journal_prompts.id` if this was a guided entry.
- **title** (text): Title of the entry.
- **content** (text): The main body of the journal entry.
- **created_at** (timestamptz): Default `now()`.
- **updated_at** (timestamptz): Default `now()`.

### 5. `therapist_connections`
Manages the relationship and access permissions between a patient and a therapist.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **patient_id** (uuid, FK): References `profiles.id`.
- **therapist_id** (uuid, FK): References `profiles.id`.
- **status** (text): Connection state ('pending', 'active', 'rejected', 'terminated'). Default 'pending'.
- **created_at** (timestamptz): Default `now()`.

## Security Policies (RLS)
- **profiles**: Users can view/edit their own profile. Therapists can view profiles of connected patients.
- **mood_logs**: Users can CRUD their own logs. Connected therapists can View logs.
- **journal_entries**: Users can CRUD their own entries. Connected therapists can View entries.
- **journal_prompts**: Publicly readable (authenticated). Admin writable.
- **therapist_connections**: Users can create requests. Involved parties can view/update status.
