using MediatR;
using RolesEnum = ChapterX.Domain.Entities.Roles;

namespace ChapterX.Application.Roles.Commands
{
    public record DeleteRequest(RolesEnum Value) : IRequest<DeleteResponse>;
}
