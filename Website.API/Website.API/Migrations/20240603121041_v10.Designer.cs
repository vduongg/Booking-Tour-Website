﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Website.API.Data;

#nullable disable

namespace Website.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240603121041_v10")]
    partial class v10
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.29")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("TourWishList", b =>
                {
                    b.Property<int>("ToursTourId")
                        .HasColumnType("int");

                    b.Property<int>("WishListId")
                        .HasColumnType("int");

                    b.HasKey("ToursTourId", "WishListId");

                    b.HasIndex("WishListId");

                    b.ToTable("TourWishList");
                });

            modelBuilder.Entity("Website.API.Models.FeedBack", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeedbackId"), 1L, 1);

                    b.Property<string>("FeedbackDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TourId1")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FeedbackId");

                    b.HasIndex("TourId1");

                    b.HasIndex("UserId");

                    b.ToTable("FeedBacks");
                });

            modelBuilder.Entity("Website.API.Models.Image", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImageId"), 1L, 1);

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TourId")
                        .HasColumnType("int");

                    b.HasKey("ImageId");

                    b.HasIndex("TourId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Website.API.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderId"), 1L, 1);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderCode")
                        .HasColumnType("int");

                    b.Property<string>("OrderDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Refund")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalPeople")
                        .HasColumnType("int");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<int>("TourId")
                        .HasColumnType("int");

                    b.Property<int>("TransactionId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("OrderId");

                    b.HasIndex("UserId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Website.API.Models.Policy", b =>
                {
                    b.Property<int>("PolicyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PolicyId"), 1L, 1);

                    b.Property<string>("PolicyDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PolicyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PolicyId");

                    b.ToTable("Policy");
                });

            modelBuilder.Entity("Website.API.Models.Tour", b =>
                {
                    b.Property<int>("TourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourId"), 1L, 1);

                    b.Property<DateTime?>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DepartureDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PolicyId")
                        .HasColumnType("int");

                    b.Property<int?>("TourDateId")
                        .HasColumnType("int");

                    b.Property<string>("TourDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourPlace")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TourPrice")
                        .HasColumnType("int");

                    b.Property<string>("TourStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TourTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TourId");

                    b.HasIndex("PolicyId");

                    b.HasIndex("TourDateId");

                    b.HasIndex("TourTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Tours");
                });

            modelBuilder.Entity("Website.API.Models.TourDate", b =>
                {
                    b.Property<int>("TourDateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourDateId"), 1L, 1);

                    b.Property<int>("Day")
                        .HasColumnType("int");

                    b.Property<int>("Night")
                        .HasColumnType("int");

                    b.HasKey("TourDateId");

                    b.ToTable("TourDate");
                });

            modelBuilder.Entity("Website.API.Models.TourType", b =>
                {
                    b.Property<int>("TourTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourTypeId"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TourTypeId");

                    b.ToTable("TourType");
                });

            modelBuilder.Entity("Website.API.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Website.API.Models.UserInfo", b =>
                {
                    b.Property<int>("UserInfoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserInfoId"), 1L, 1);

                    b.Property<string>("EmailConfirmed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserInfoId");

                    b.HasIndex("UserId");

                    b.ToTable("UserInfo");
                });

            modelBuilder.Entity("Website.API.Models.WishList", b =>
                {
                    b.Property<int>("WishListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishListId"), 1L, 1);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("WishListId");

                    b.HasIndex("UserId");

                    b.ToTable("WishList");
                });

            modelBuilder.Entity("TourWishList", b =>
                {
                    b.HasOne("Website.API.Models.Tour", null)
                        .WithMany()
                        .HasForeignKey("ToursTourId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Website.API.Models.WishList", null)
                        .WithMany()
                        .HasForeignKey("WishListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Website.API.Models.FeedBack", b =>
                {
                    b.HasOne("Website.API.Models.Tour", "Tour")
                        .WithMany("FeedBacks")
                        .HasForeignKey("TourId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Website.API.Models.User", "User")
                        .WithMany("FeedBack")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tour");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Website.API.Models.Image", b =>
                {
                    b.HasOne("Website.API.Models.Tour", "Tour")
                        .WithMany("Image")
                        .HasForeignKey("TourId");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("Website.API.Models.Order", b =>
                {
                    b.HasOne("Website.API.Models.User", "User")
                        .WithMany("Order")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Website.API.Models.Tour", b =>
                {
                    b.HasOne("Website.API.Models.Policy", "Policy")
                        .WithMany()
                        .HasForeignKey("PolicyId");

                    b.HasOne("Website.API.Models.TourDate", "TourDate")
                        .WithMany("tours")
                        .HasForeignKey("TourDateId");

                    b.HasOne("Website.API.Models.TourType", "TourType")
                        .WithMany("tours")
                        .HasForeignKey("TourTypeId");

                    b.HasOne("Website.API.Models.User", "User")
                        .WithMany("Tour")
                        .HasForeignKey("UserId");

                    b.Navigation("Policy");

                    b.Navigation("TourDate");

                    b.Navigation("TourType");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Website.API.Models.UserInfo", b =>
                {
                    b.HasOne("Website.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Website.API.Models.WishList", b =>
                {
                    b.HasOne("Website.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Website.API.Models.Tour", b =>
                {
                    b.Navigation("FeedBacks");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("Website.API.Models.TourDate", b =>
                {
                    b.Navigation("tours");
                });

            modelBuilder.Entity("Website.API.Models.TourType", b =>
                {
                    b.Navigation("tours");
                });

            modelBuilder.Entity("Website.API.Models.User", b =>
                {
                    b.Navigation("FeedBack");

                    b.Navigation("Order");

                    b.Navigation("Tour");
                });
#pragma warning restore 612, 618
        }
    }
}