export interface userBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface loginUserBody {
  email: string;
  password: string;
}

export interface newUserBody {
  name: string;
  email: string;
  hash_key: string;
  role?: string;
}

export interface dbMember_Response {
  member_id: string;
  name: string;
  email: string;
  active_status: boolean;
  joined_date: Date;
  hash_key: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
