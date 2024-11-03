-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "Name" VARCHAR(30) NOT NULL,
    "Incharge" VARCHAR(20) NOT NULL,
    "Dept" VARCHAR(10) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "USN" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "m_id" SERIAL NOT NULL,
    "P_no" BIGINT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("USN")
);

-- CreateTable
CREATE TABLE "Membership" (
    "c_id" INTEGER NOT NULL,
    "usn" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("c_id","usn")
);

-- CreateTable
CREATE TABLE "Events" (
    "e_id" SERIAL NOT NULL,
    "e_name" VARCHAR(30) NOT NULL,
    "c_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" VARCHAR(100) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("e_id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "r_id" SERIAL NOT NULL,
    "m_d" INTEGER NOT NULL,
    "e_id" INTEGER NOT NULL,
    "Attendance" BOOLEAN NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("r_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_m_id_key" ON "Member"("m_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_usn_fkey" FOREIGN KEY ("usn") REFERENCES "Member"("USN") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_m_d_fkey" FOREIGN KEY ("m_d") REFERENCES "Member"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_e_id_fkey" FOREIGN KEY ("e_id") REFERENCES "Events"("e_id") ON DELETE CASCADE ON UPDATE CASCADE;
