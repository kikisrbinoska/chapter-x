using MediatR;

namespace ChapterX.Application.RegularUser.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
