-- noinspection LossyEncodingForFile


/*
Use Master
GO
Drop Database T_Game
GO
*/
     
CREATE DATABASE T_Game2
GO

Use T_Game2
GO

-- ����� ���� ������
EXEC sp_addtype 'Us_Code', 'int', 'not null'
EXEC sp_addtype 'Us_Id', 'char (10)', 'not null'
EXEC sp_addtype 'Us_Names', 'varchar (16)', 'not null'
GO

-- ����� ������
create TABLE [Users] (
	[User_Id] int identity(1,1) primary key,
	[User_Name] [Us_Names] ,
	[User_Password] [US_Names],
	[Email] nvarchar(30)	  
)
GO

create TABLE [High_Score] (
	[User_Id] int identity(1,1) FOREIGN KEY 
          (User_Id) REFERENCES [dbo].[Users] (User_Id) ,
	[User_Name] [Us_Names] ,
	[High_Score] [Us_Code] Null	
) 
GO


-- ����� ������ ������
--ALTER TABLE [dbo].[Users]
--ADD
--CONSTRAINT [PK_Users] PRIMARY KEY (User_Id)
--GO



-- ����� ������ ���� - ���� ������ �������
--ALTER TABLE [dbo].[High_Score]
--ADD
--CONSTRAINT [Fk_High_Score] FOREIGN KEY 
--          (User_Id) REFERENCES [dbo].[Users] (User_Id)
--go



-- �������� ������ ������� ����� �������
-- �������� ������ ����� ���
create proc P_Insert_User 
@Name [Us_Names],
@Pass [Us_Names],
@Email nvarchar(30)
as
BEGIN
   Insert [dbo].[Users]
    (
	[User_Name],
	[User_Password],
	[Email]
	) 
	Values (
	@Name,
	@Pass,
	@Email
	)
	end
	begin
	Insert [dbo].[High_Score]
	(
[User_Name],
[High_Score]
	)
	values(
	@Name,
	0
	)
END
go

alter proc P_Check_Availability
@Name [Us_Names],
@Pass [Us_Names],
@Email nvarchar(30)
as
IF not EXISTS
(select * from [dbo].[Users] where [Email] = @Email)
begin
exec P_Insert_User @Name,@Pass,@Email
end
go

exec P_Check_Availability 'Alon2222' , '1234' , 'email1'
go

exec P_Check_Availability 'Yakir' , '123' , 'email2'
go

exec P_Check_Availability 'orchay' , '123' , 'abc4214125'
go

select * from Users



alter proc P_Update_HighScore
@Email nvarchar(30),
@NewScore int
as
	declare @id int
	set @id = (select [User_Id] from Users where [Email] = @Email)
	update [dbo].[High_Score] set [High_Score] = @NewScore where [User_Id] = @id AND [High_Score]<@NewScore
go
