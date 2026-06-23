using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ChapterX.Application.Auth
{
    public record RegisterRequest(
        [Required][MaxLength(50)] string Username,
        [Required][EmailAddress][MaxLength(200)] string Email,
        [Required][MaxLength(100)] string Name,
        [Required][MaxLength(100)] string Surname,
        [Required][MinLength(8)][MaxLength(128)] string Password
    ) : IRequest<RegisterResponse>;
}
