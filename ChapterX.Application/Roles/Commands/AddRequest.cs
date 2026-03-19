using MediatR;
using RolesEnum = ChapterX.Domain.Entities.Roles;

namespace ChapterX.Application.Roles.Commands
{
    public record AddRequest(RolesEnum Value) : IRequest<AddResponse>;
}
